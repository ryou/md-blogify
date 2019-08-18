"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var analyze_markdown_for_blog_article_1 = __importDefault(require("analyze-markdown-for-blog-article/"));
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var fileUtils_1 = require("./fileUtils");
/**
 * articleData（個別記事情報）とarticleDataInList（記事一覧情報内の個別記事情報）を返却
 *
 * @param markdown
 * @param previewLength
 * @param slug
 */
exports.makeArticleInfo = function (markdown, previewLength, slug) {
    var analyzedData = analyze_markdown_for_blog_article_1.default(markdown, {
        previewLength: previewLength,
    });
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
    };
};
/**
 * 個別記事情報をjsonファイルとして出力
 *
 * @param absoluteBasePath
 * @param slug
 * @param fileName
 * @param articleData
 */
var writeArticleData = function (absoluteBasePath, slug, fileName, articleData) {
    var filePath = path_1.resolve(absoluteBasePath, slug, fileName + ".json");
    return fs_extra_1.outputJson(filePath, articleData);
};
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
exports.mdBlogify = function (inputDirectory, outputDirectory, articlePatterns, options) {
    if (options === void 0) { options = {
        summaryPath: null,
        previewLength: null,
    }; }
    return __awaiter(_this, void 0, void 0, function () {
        var absoluteInputBasePath, absoluteOutputBasePath, absoluteFilePathList, articleList, absoluteSummaryPath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs_extra_1.mkdirp(outputDirectory);
                    absoluteInputBasePath = path_1.resolve(inputDirectory);
                    absoluteOutputBasePath = path_1.resolve(outputDirectory);
                    return [4 /*yield*/, fileUtils_1.searchFilesMatchPatterns(absoluteInputBasePath, articlePatterns)];
                case 1:
                    absoluteFilePathList = _a.sent();
                    articleList = [];
                    return [4 /*yield*/, Promise.all(absoluteFilePathList.map(function (absoluteFilePath) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, content, slug, fileName, _b, articleData, articleDataInList;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = fileUtils_1.getFileData(absoluteInputBasePath, absoluteFilePath, function (filePath) {
                                            return fs_extra_1.readFileSync(filePath, { encoding: 'utf-8' });
                                        }), content = _a.content, slug = _a.slug, fileName = _a.fileName;
                                        _b = exports.makeArticleInfo(content, options.previewLength, slug), articleData = _b.articleData, articleDataInList = _b.articleDataInList;
                                        return [4 /*yield*/, writeArticleData(absoluteOutputBasePath, slug, fileName, articleData)];
                                    case 1:
                                        _c.sent();
                                        articleList.push(articleDataInList);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    if (options.summaryPath !== null) {
                        absoluteSummaryPath = path_1.resolve(options.summaryPath);
                        fs_extra_1.outputJson(absoluteSummaryPath, articleList);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
