function ajax(ajaxOptions) {

    //    parametry połączenia i typu
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text'
    }

    //    funkcja sprawdzająca status połączenia
    function httpSuccess(httpRequest) {
        try {
            return (
                httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch (e) {
            return false;
        }
    }


        //    utworzenie obiektu XMLHttpRequest
        var httpReq = new XMLHttpRequest();

        //    otwarcie połączenia 
        httpReq.open(options.type, options.url, true);

        //    sprawdz stan dokumentu
        httpReq.onreadystatechange = function () {
            if (httpReq.readyState == 4) {

                //            sprawdzamy status polaczenia
                if (httpSuccess(httpReq)) {
                    var returnData = (options.dataType == 'XML') ?
                        httpReq.responseXML : httpReq.responseText;

                    //                jesli wszystko jest ok to funkcja onSuccess
                    options.onSuccess(returnData);

                    //                zeruj obiekt zeby nie wysylac do serwera i nie utrzymywac polaczenia
                    httpReq = null;
                } else {

                    //                jezeli blad wykonaj onError
                    options.onError(httpReq.statusText);
                }
            }
        }

        //    wysylamy obrobione zadanie
        httpReq.send();
    }