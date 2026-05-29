import fs from "fs/promises"

const FILE_PATH = "src/data/tasks.json"

export async function readFile() {
    const data = await fs.readFile(FILE_PATH, "utf-8")
    return JSON.parse(data)
}

export async function writeFile(data : any) {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2))
}