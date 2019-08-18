interface ArticleData {
    title: string;
    bodyHtml: string;
    frontmatters: {
        [key: string]: string;
    };
}
interface ArticleDataInList {
    title: string;
    preview: string | null;
    slug: string;
    frontmatters: {
        [key: string]: string;
    };
}
/**
 * articleData（個別記事情報）とarticleDataInList（記事一覧情報内の個別記事情報）を返却
 *
 * @param markdown
 * @param previewLength
 * @param slug
 */
export declare const makeArticleInfo: (markdown: string, previewLength: Number | null, slug: string) => {
    articleData: ArticleData;
    articleDataInList: ArticleDataInList;
};
interface MdBlogifyOptions {
    summaryPath: string | null;
    previewLength: Number | null;
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
export declare const mdBlogify: (inputDirectory: string, outputDirectory: string, articlePatterns: string[], options?: MdBlogifyOptions) => Promise<void>;
export {};
