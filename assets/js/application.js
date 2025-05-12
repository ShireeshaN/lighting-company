< script >
    $(document).ready(function() {
        $(".application-carousel").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }); <
/script>