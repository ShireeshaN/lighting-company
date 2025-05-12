< script >
    document.getElementById('contact_form').addEventListener('submit', function(e) {
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const message = this.message.value.trim();

        if (!name || !email || !phone || !message) {
            e.preventDefault(); // Stop form submission
            alert('Please fill in all fields.');
        }
    }); <
/script>