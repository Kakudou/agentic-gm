import { randomInt } from 'node:crypto'
import { rollDice, RPG_DICE } from './core/rpg-dice.js'

const PLUGIN_ID = 'agentic-gm.rpg-dice'

// agentic-gm is a gamemaster-only installation, so the
// tool is always available. It still never decides game outcomes and never writes
// files; it only returns faces and an audit receipt.
export default {
  id: PLUGIN_ID,
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: RPG_DICE.name,
        description: RPG_DICE.description,
        input: RPG_DICE.inputSchema,
        output: { type: 'string' },
        options: { codemode: false },
        execute: async (args) => {
          const receipt = rollDice(args, randomInt)
          const output = JSON.stringify(receipt)
          return { output, content: output }
        },
      })
    })
  },
}
