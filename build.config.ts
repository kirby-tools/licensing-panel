import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: 'src',
      loaders: ['js', /* 'vue', */ 'sass', 'postcss'],
    },
  ],
  clean: true,
  declaration: true,
})
