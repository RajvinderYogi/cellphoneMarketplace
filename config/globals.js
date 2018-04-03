module.exports= {
    db: 'mongodb://rajvinderyogi:27591*Mani@ds117489.mlab.com:17489/cellphonemarketplace',
    google:{
        googleClientId:'352903993244-03i8k5d1q4jpcpfuum637ja5d4u83jsi.apps.googleusercontent.com',
        googleClientSecret:'FRcREPzRRQPAuM9Y4L5OPXzI',
        // googleCallbackUrl:'http://localhost:3000/google/callback'
        googleCallbackUrl:'https://cellphonemarketplace.herokuapp.com/google/callback'
    },
    linkedin:{
        linkedinClientId:'78pk21txaovdq8',
        linkedinClientSecret:'6AawCs1Pnt8iVgeU',
        // linkedinCallbackUrl:'http://localhost:3000/linkedin/callback'
        linkedinCallbackUrl:'https://cellphonemarketplace.herokuapp.com/linkedin/callback'
    },
    instagram: {
        instaclientID: '791fd739980d497a8842e11d8cbb0815',
        instaclientSecret: '64439b9eea5e4c408f409e564c6d7338',
        // instaCallbackUrl: 'http://localhost:3000/instagram/callback',
        instaCallbackUrl:'https://cellphonemarketplace.herokuapp.com/instagram/callback'

    }
};