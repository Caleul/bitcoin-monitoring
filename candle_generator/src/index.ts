import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChannel } from './messages/messageChanel'

config()

const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API)
    const data = result.data
    const price = data.bitcoin.usd
    return price
}

const generateCandles = async () => {

    const messageChanel = await createMessageChannel()

    if (messageChanel) {
        while (true) {
            const loopTimes = Period.FIVE_MINUTES / Period.ONE_MINUTE
            const candle = new Candle('BTC', new Date())
    
            console.log('------------------------------------------------------------------------------------------')
            console.log('Generating new candle\n')
    
            for (let i = 0; i < loopTimes; i++) {
                const price = await readMarketPrice()
                candle.addValue(price)
                console.log(`Market price #${i + 1} of ${loopTimes}`)
                await new Promise(resolve => setTimeout(resolve, Period.ONE_MINUTE))
            }
    
            candle.closeCandle()
            console.log('Candle closed')

            const candleObj = candle.toSimpleObject()
            const candleJson = JSON.stringify(candleObj)
            messageChanel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
            console.log('Candle enqueued')
        }
    }
}

generateCandles()