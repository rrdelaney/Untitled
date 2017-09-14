// @flow

import RenderStream from './'

type RenderProps = {
  assets: string[]
}

const renderer: RenderStream<RenderProps> = new RenderStream(
  ({ render, flush, locals }) => render`<!doctype html>
<html>
  ${flush}
  ${locals.assets.then(assets =>
    assets.map(a => `<link href=${a}>`).join('\n')
  )}
</html>
`
)

renderer.on('data', console.log)
renderer.on('end', () => {
  console.log('Stream ended!')
})

renderer.start()

renderer.push({ assets: ['a', 'b'] })
