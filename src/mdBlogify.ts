import analyzeMarkdownForBlogArticle from 'analyze-markdown-for-blog-article/'
import { mkdirp, outputJson, readFileSync } from 'fs-extra'
import { resolve } from 'path'
import { getFileData, searchFilesMatchPatterns } from './fileUtils'

interface ArticleData {
    title: string
    bodyHtml: string
    frontmatters: { [key: string]: string }
}

interface ArticleDataInList {
    title: string
    preview: string | null
    slug: string
    frontmatters: { [key: string]: string }
}

/**
 * articleData（個別記事情報）とarticleDataInList（記事一覧情報内の個別記事情報）を返却
 *
 * @param markdown
 * @param previewLength
 * @param slug
 */
export const makeArticleInfo = (
    markdown: string,
    previewLength: Number | null,
    slug: string
): {
    articleData: ArticleData
    articleDataInList: ArticleDataInList
} => {
    const analyzedData = analyzeMarkdownForBlogArticle(markdown, {
        previewLength,
    })
    return {
        articleData: {
            title: analyzedData.title,
            bodyHtml: analyzedData.bodyHtml,
            frontmatters: analyzedData.frontmatters,
        },
        articleDataInList: {
            title: analyzedData.title,
            preview: analyzedData.preview,
            slug: slug,
            frontmatters: analyzedData.frontmatters,
        },
    }
}

/**
 * 個別記事情報をjsonファイルとして出力
 *
 * @param absoluteBasePath
 * @param slug
 * @param fileName
 * @param articleData
 */
const writeArticleData = (
    absoluteBasePath: string,
    slug: string,
    fileName: string,
    articleData: ArticleData
): Promise<void> => {
    const filePath = resolve(absoluteBasePath, slug, `${fileName}.json`)

    return outputJson(filePath, articleData)
}

interface MdBlogifyOptions {
    summaryPath: string | null
    previewLength: Number | null
}

/**
 * inputDirectory内に存在するarticlePatternsにマッチする記事からブログ記事化するのに必要な情報を抽出し、
 * outputDirectoryにディレクトリ構造を維持した形で出力する。
 * summaryPathが与えられている場合は記事の一覧情報を指定されたパスに出力。
 * previewLengthが与えられている場合は記事要約情報に指定された文字数分の記事要約が付加される。
 *
 * @param inputDirectory
 * @param outputDirectory
 * @param articlePatterns
 * @param options
 */
export const mdBlogify = async (
    inputDirectory: string,
    outputDirectory: string,
    articlePatterns: string[],
    options: MdBlogifyOptions = {
        summaryPath: null,
        previewLength: null,
    }
): Promise<void> => {
    mkdirp(outputDirectory)
    const absoluteInputBasePath = resolve(inputDirectory)
    const absoluteOutputBasePath = resolve(outputDirectory)

    const absoluteFilePathList = await searchFilesMatchPatterns(
        absoluteInputBasePath,
        articlePatterns
    )
    const articleList: ArticleDataInList[] = []
    await Promise.all(
        absoluteFilePathList.map(async absoluteFilePath => {
            const { content, slug, fileName } = getFileData(
                absoluteInputBasePath,
                absoluteFilePath,
                (filePath: string): string => {
                    return readFileSync(filePath, { encoding: 'utf-8' })
                }
            )
            const { articleData, articleDataInList } = makeArticleInfo(
                content,
                options.previewLength,
                slug
            )

            await writeArticleData(
                absoluteOutputBasePath,
                slug,
                fileName,
                articleData
            )
            articleList.push(articleDataInList)
        })
    )

    if (options.summaryPath !== null) {
        const absoluteSummaryPath = resolve(options.summaryPath)
        outputJson(absoluteSummaryPath, articleList)
    }
}
