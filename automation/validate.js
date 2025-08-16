// CommonJS script run by CI
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const Ajv2020 = require('ajv/dist/2020')
const addFormats = require('ajv-formats')
const glob = require('glob')

// ---------- Helpers ----------
const read = (p) => fs.readFileSync(p, 'utf8')
const exists = (p) => fs.existsSync(p)
const safeLoad = (p) => yaml.load(read(p))

// ---------- Path allow-list ----------
const allowed = [
  /^\.github\/workflows\/.+$/, // CI workflow(s)
  /^automation\/(schemas\/.+|validate\.js|index_repo\.py|index_config\.md)$/, // automation bits
  /^docs\/.+$/, // docs
  /^memory\/.+$/, // memory files
  /^proposals\/.+$/, // proposals
  /^logs\/.+$/, // logs (append-only)
  /^workflows\/.+$/, // n8n exports
  /^\.gitignore$/,
  /^\.gitattributes$/,
  /^\.markdownlint\.json$/,
  /^\.vscode\/settings\.json$/, // editor schema hints
  /^\.prettierignore$/, // ← allow Prettier ignore at repo root
  /^\.prettierrc(?:\.json)?$/, // ← allow Prettier config at repo root
  /^package\.json$/, // <-- add this
  /^package-lock\.json$/, // <-- add this
]

// Changed files (PR) or all tracked files (push)
function changedFiles() {
  const base = process.env.GITHUB_BASE_SHA
  const head = process.env.GITHUB_HEAD_SHA || process.env.GITHUB_SHA
  if (base && head) {
    const out = require('child_process')
      .execSync(`git diff --name-only ${base} ${head}`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean)
    return out
  }
  // Fallback: validate everything tracked (on push)
  const out = require('child_process')
    .execSync(`git ls-files`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  return out
}

// ---------- Schema validators ----------
const ajv = new Ajv2020({ allErrors: true })
addFormats(ajv) // optional, but useful for things like "format": "uri", "date-time", etc.

const schemaMap = {
  'memory/identity.yaml': 'automation/schemas/identity.schema.json',
  'memory/goals.yaml': 'automation/schemas/goals.schema.json',
  'memory/beliefs.yaml': 'automation/schemas/beliefs.schema.json',
  'memory/tasks.yaml': 'automation/schemas/tasks.schema.json',
  'memory/contradictions.yaml': 'automation/schemas/contradictions.schema.json',
  'memory/metrics.yaml': 'automation/schemas/metrics.schema.json',
}

function validateSchemas() {
  let ok = true
  for (const [yml, schemaPath] of Object.entries(schemaMap)) {
    if (!exists(yml)) {
      console.error(`❌ Missing required file: ${yml}`)
      ok = false
      continue
    }
    const schema = JSON.parse(read(schemaPath))
    const validate = ajv.compile(schema)
    const data = safeLoad(yml)
    const valid = validate(data)
    if (!valid) {
      console.error(`❌ Schema errors in ${yml}:`)
      console.error(validate.errors)
      ok = false
    } else {
      console.log(`✅ ${yml} passes schema`)
    }
  }
  return ok
}

function validateProposals() {
  const pattern = 'proposals/**/*.yaml'
  const files = glob.sync(pattern, { nodir: true })
  if (!files.length) {
    console.log('ℹ️ No proposals to validate.')
    return true
  }
  const schema = JSON.parse(read('automation/schemas/proposal.schema.json'))
  const validate = ajv.compile(schema)
  let ok = true
  for (const f of files) {
    try {
      const data = safeLoad(f)
      const valid = validate(data)
      if (!valid) {
        console.error(`❌ Proposal schema errors in ${f}:`)
        console.error(validate.errors)
        ok = false
      } else {
        console.log(`✅ ${f} passes proposal schema`)
      }
    } catch (e) {
      console.error(`❌ Failed to parse ${f}: ${e.message}`)
      ok = false
    }
  }
  return ok
}

function failOnDisallowedPaths(files) {
  let ok = true
  for (const f of files) {
    const allowedMatch = allowed.some((re) => re.test(f))
    if (!allowedMatch) {
      console.error(`❌ Disallowed path in changes: ${f}`)
      ok = false
    }
  }
  return ok
}

function referentialIntegrity() {
  let ok = true
  const goals = safeLoad('memory/goals.yaml').goals || []
  const beliefs = safeLoad('memory/beliefs.yaml').beliefs || []
  const tasks = safeLoad('memory/tasks.yaml').tasks || []

  const goalIds = new Set([
    ...goals.map((g) => g.id),
    ...goals.flatMap((g) => (g.children || []).map((c) => c.id)),
  ])
  const beliefIds = new Set(beliefs.map((b) => b.id))

  for (const t of tasks) {
    if (!/^T-\d{4}$/.test(t.id || '')) {
      console.error(`❌ Task ID format invalid: ${t.id}`)
      ok = false
    }
    const badGoals = (t.links?.goal_ids || []).filter((id) => !goalIds.has(id))
    const badBeliefs = (t.links?.belief_ids || []).filter(
      (id) => !beliefIds.has(id)
    )
    if (badGoals.length) {
      console.error(
        `❌ Task ${t.id} links unknown goal IDs: ${badGoals.join(', ')}`
      )
      ok = false
    }
    if (badBeliefs.length) {
      console.error(
        `❌ Task ${t.id} links unknown belief IDs: ${badBeliefs.join(', ')}`
      )
      ok = false
    }
  }
  if (ok) console.log('✅ Referential integrity OK (tasks → goals/beliefs)')
  return ok
}

// ---------- Run ----------
// ignore noisy/generated files
function ignorePath(p) {
  return (
    p.startsWith('node_modules/') ||
    p.startsWith('.git/') ||
    p === '.DS_Store' ||
    p.endsWith('/.DS_Store')
  )
}

const files = changedFiles().filter((f) => !ignorePath(f))
console.log('Files considered:', files)

const pathsOK = failOnDisallowedPaths(files)
const schemasOK = validateSchemas()
const refsOK = referentialIntegrity()
const proposalsOK = validateProposals()

if (!(pathsOK && schemasOK && refsOK && proposalsOK)) {
  console.error('❌ CI validation failed.')
  process.exit(1)
}
console.log('✅ CI validation passed.')
