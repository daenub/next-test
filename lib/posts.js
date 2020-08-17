import fs from "fs"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"
import remark from "remark"
import html from "remark-html"

// https://github.com/jonschlinkert/gray-matter/issues/62
const _matter = string => matter(string, {
  engines: {
    yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA })
  }
})

const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = _matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allPostData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}


export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = _matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
