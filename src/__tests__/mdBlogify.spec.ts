/*
 * TODO: Jestのグローバルでエラー出さないためのコメント
 *  ちゃんと補完が効く形にするか、~.spec.tsのみglobalを設定するかとかで対応したい
 */
/* global describe, test, expect */

import { makeArticleInfo } from '../mdBlogify'

describe('makeArticleInfo', () => {
    test('一般的なパターン', () => {
        const result = makeArticleInfo(
            '---\ncreated_at: 2019-08-15\n---\n\n# タイトル\n## 最初の見出し\n### サンプルテキスト\n',
            10,
            'sample-article'
        )
        expect(result).toEqual({
            articleData: {
                title: 'タイトル',
                bodyHtml: '<h2>最初の見出し</h2>\n<h3>サンプルテキスト</h3>\n',
                frontmatters: {
                    created_at: '2019-08-15',
                },
            },
            articleDataInList: {
                title: 'タイトル',
                preview: '最初の見出しサンプル',
                slug: 'sample-article',
                frontmatters: {
                    created_at: '2019-08-15',
                },
            },
        })
    })
})
