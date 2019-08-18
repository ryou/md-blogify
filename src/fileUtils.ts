import { parse, resolve, isAbsolute, relative } from 'path'
import globby from 'globby'

/**
 * patternsにマッチするファイルを検索し絶対パスの配列として返却
 *
 * @param absoluteBasePath
 * @param patterns
 */
export const searchFilesMatchPatterns = async (
    absoluteBasePath: string,
    patterns: string[]
): Promise<string[]> => {
    if (!isAbsolute(absoluteBasePath)) {
        throw new Error('argument absoluteBasePath needs to be absolute path.')
    }

    return globby(patterns.map(pattern => resolve(absoluteBasePath, pattern)))
}

/**
 * 記事ファイルから、
 * content: 記事内容（ファイルの中身）
 * slug: スラグ（後述）
 * fileName: 拡張子抜きファイル名
 * を返却
 *
 * ※slug
 * absoluteBasePathが'/home/user/posts'
 * absoluteFilePathが'/home/user/posts/category-node/sample-article/README.md'
 * の場合、slugは'category-note/sample-article'となる。
 *
 * @param absoluteBasePath
 * @param absoluteFilePath
 * @param readFileSyncFunction
 */
export const getFileData = (
    absoluteBasePath: string,
    absoluteFilePath: string,
    readFileSyncFunction: (filePath: string) => string
): { content: string; slug: string; fileName: string } => {
    const content = readFileSyncFunction(absoluteFilePath)
    const relativeFilePathFromBasePath = relative(
        absoluteBasePath,
        absoluteFilePath
    )
    const { dir, name } = parse(relativeFilePathFromBasePath)
    return {
        content: content,
        slug: dir,
        fileName: name,
    }
}
