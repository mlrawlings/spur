var request = require('superagent')
  , config = require('../../common/config')
  , host = config.api.protocol + '://' + config.api.host + ':' + config.api.port

window.fbAsyncInit = function() {
    console.log('fbAsyncInit')
    
    var fbButton = document.querySelector('button.facebook')
      , userId = null

    FB.init({
        appId: '1455687261396384',
        xfbml: false,
        status: true,
        version: 'v2.3'
    })

    FB.getLoginStatus(onChangeLoginStatus)

    fbButton.addEventListener('click', function() {
        if(userId) {
            FB.logout(onChangeLoginStatus)
        } else {
            FB.login(onChangeLoginStatus)
        }
    })

    function onChangeLoginStatus(response) {
        if(response.status == 'connected') {
            userId = response.authResponse.userID
            fbButton.querySelector('span').textContent = 'Log out'
            fbButton.querySelector('img').src = 'https://graph.facebook.com/v2.3/'+userId+'/picture'
            console.log(response.authResponse.accessToken)
            
            request.post(host+'/auth?access_token='+response.authResponse.accessToken).end(function(err, res){
                if(err) throw err
            })
        } else {
            userId = null
            fbButton.querySelector('span').textContent = 'Log in'
            fbButton.querySelector('img').src = '/images/facebook-icon-white.png'

            request.del(host+'/auth').end(function(err, res){
                if(err) throw err
            })
        }
    }
}