import config from './../utils/config'
import { CronJob } from 'cron'

config.getServerStatus.forEach((e) => {
  new CronJob(
    e.crontab,
    () => {
      console.log(`${e.name} is running...`)
    },
    null,
    true,
    'Asia/Shanghai'
  )
})