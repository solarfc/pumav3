/*
    Video
 */

(function() {
    let videoMediaStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        border: "none"
    };

    $(".video-media").css(videoMediaStyle);

    $(".js-show-video").click(function() {
        let id = $(this).data("video");
        let parent = $(this).parent()[0];
        let iframe =
            '<iframe class="video-media" src="https://www.youtube.com/embed/' +
            id +
            '?autoplay=1&amp;loop=1&amp;&amp;playlist=Video_ID" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $(parent).empty();
        $(parent).append(iframe);
        $(".video-media").css(videoMediaStyle);
    });
})();