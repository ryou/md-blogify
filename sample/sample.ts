import { mdBlogify } from '../src/mdBlogify'

mdBlogify('sample/posts', 'sample/posts_converted', ['**/README.md'], {
    summaryPath: 'sample/posts_converted/summary.json',
    previewLength: 10,
})
