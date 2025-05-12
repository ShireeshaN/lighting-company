< script >
    document.getElementById('contact_form').addEventListener('submit', function(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch('mail.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(data => {
                if (data.includes('success')) {
                    window.location.href = 'thankyou.html'; // Redirect to your thank you page
                } else {
                    alert('Something went wrong. Please try again.');
                }
            })
            .catch(err => {
                alert('An error occurred. Please try again later.');
            });
    }); <
/script>