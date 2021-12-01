const getPlateNumber = (platePicB64) => {
    return fetch('http://192.168.1.5:3000/getPlateNumber', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({ upload:  platePicB64  })
    })
};

export default {
    getPlateNumber
}