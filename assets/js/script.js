// Form Validation
$('.signup-btn').click(function (e) {
    e.preventDefault;
    $('.sign-me-form').validate({
        rules: {
            Name: {
                required: true
            },
            Email: {
                required: true,
                email: true
            },
        },
        messages: {
            Name: "We need your name",
            Email: "We need your email address",
        },
        submitHandler: function () {
            $(".signup-heading").addClass("hide");
            $(".sign-me-form").addClass("hide");
            $(".loader").removeClass("hide");
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwwW923ALyta_EppTDNkWV5Vukyrd27drDAC-577Nk0JHZ2sX8/exec'
            const form = document.forms['submit-to-google-sheet']
            console.log(form);
            e.preventDefault()
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (response.status == "200") {
                        $(".loader").addClass("hide");
                    }
                    console.log('Success!', response);
                    $(".success-state").removeClass("hide");
                    setTimeout(function () {
                        $("#signupModal .close").click()
                        $(".success-state").addClass("hide");
                        $(".signup-heading").removeClass("hide");
                        $(".sign-me-form").removeClass("hide");

                    }, 3000);
                })
                .catch(error => console.error('Error!', error.message))
        }
    });

});
// Form and Validation Reset 
$('#signupModal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $(this).validate().resetForm();
});