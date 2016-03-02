function connect(url, params, success, failure) {
    $.ajax({
        url: url,
        data: {
            "request": JSON.stringify(params)
        },
        success: function (data) {

            var json = JSON.parse(data);

            if (json.success) {
                if (success && typeof success === "function") {
                    success(json);

                } else {
                    alert(json.message);
                }
            } else {
                if (failure && typeof failure === "function") {
                    failure(json);
                } else {
                    alert(json.message);
                }
            }
        },
        error: function (data) {
            if (failure && typeof failure === "function") {
                var json = {
                    success: false,
                    message: "network error"
                };
                failure(json);
            } else {
                alert("network error");
            }
        }
    });
}
;
