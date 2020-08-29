const redis = require('redis');

let redisClient = redis.createClient('6379');

exports.getData =  function(callback){
    redisClient.hgetall('reservations', async function(err, object) {
        callback(object)
    });


}

exports.setData = function(data ,action_type){
    switch (action_type) {
        case 'add_new_reservation':
            redisClient.hmset('reservations',data.response.data.arrange_number ,JSON.stringify(data.response.data.reservation_data));
            break;
        case 'rearrange_reservation':
            console.log(data)
            for (const key in data.response.data) {
                redisClient.hmset('reservations',data.response.data[key].arrange_number
                ,JSON.stringify(data.response.data[key].reservation_data));
            }
        break;

        default:
            break;
    }
 }
