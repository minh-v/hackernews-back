import { Magic } from "magic-sdk"
import config from "./config"
const magic = new Magic(config.MAGIC_API_KEY)

export default magic
