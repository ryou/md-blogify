/*
 * TODO: Jestのグローバルでエラー出さないためのコメント
 *  ちゃんと補完が効く形にするか、~.spec.tsのみglobalを設定するかとかで対応したい
 */
/* global describe, test, expect */

import { getFileData } from '../fileUtils'

describe('getFileData', () => {
    test('一般的なパターン', () => {
        const result = getFileData(
            '/home/www/posts',
            '/home/www/posts/sample-article/README.md',
            (filePath: string): string => {
                return '---\ncreated_at: 2019-08-15\n---\n\n# タイトル\n## 最初の見出し\nサンプルテキスト'
            }
        )
        expect(result).toEqual({
            content:
                '---\ncreated_at: 2019-08-15\n---\n\n# タイトル\n## 最初の見出し\nサンプルテキスト',
            slug: 'sample-article',
            fileName: 'README',
        })
    })
})
