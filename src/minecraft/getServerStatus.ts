import { statusBedrock, status } from 'minecraft-server-util'
import { logger } from '../utils/log'

const getBeStatus = async (ip: string, port = 19132) => {
  try {
    const res = await statusBedrock(ip, port, {
      enableSRV: false
    })
    return {
      code: 200,
      type: 'be',
      status: true,
      motd: res.motd.clean,
      max: res.players.max,
      online: res.players.online,
      version: res.version.name,
      // 协议版本
      agreement: res.version.protocol
      // name,
      // id
    }
  } catch (e) {
    logger.warn(`${ip}:${port} 状态获取失败`)
    return { code: 200, status: false }
  }
}

const getJeStatus = async (ip: string, port = 25565) => {
  try {
    const res = await status(ip, port, {
      enableSRV: true
    })
    return {
      code: 200,
      type: 'je',
      status: true,
      motd: res.motd.clean,
      max: res.players.max,
      online: res.players.online,
      // 玩家列表
      sample: res.players.sample,
      version: res.version.name,
      // 协议版本
      agreement: res.version.protocol
    }
  } catch (e) {
    logger.warn(`${ip}:${port} 获取失败`)
    return { code: 200, status: false }
  }
}

export const getServerStatus = (
  type: 'je' | 'be',
  ip: string,
  port: number
) => {
  if (type == 'be') {
    return getBeStatus(ip, port)
  } else if (type == 'je') {
    return getJeStatus(ip, port)
  }
}

export default getServerStatus
export { getJeStatus, getBeStatus }