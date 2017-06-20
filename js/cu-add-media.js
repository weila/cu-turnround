jQuery(function($) {
    jQuery(document).ready(function(){
            jQuery('#insert-my-media').click(open_media_window);
    });
    
    function open_media_window() {
        if (this.window === undefined) {
            this.window = wp.media({
                    title: 'Insert a media',
                    library: {type: 'image'},
                    multiple: false,
                    button: {text: 'Insert'}
                });
     
            var self = this; // Needed to retrieve our variable in the anonymous function below
            this.window.on('select', function() {
                    var mediaInfo = self.window.state().get('selection').first().toJSON();
                    setImgSize(mediaInfo.url);
                });
        }
     
        this.window.open();
        return false;
    };

    function setImgSize (url) {
        var width,height;
        var size ={};
        var imgObj = new Image();
        imgObj.src = url;
        imgObj.onload=function(){
            size.width = imgObj.width / 6;
            size.height = imgObj.height / 4;
            wp.media.editor.insert('<img class="cu-turnround-default" style="background: url('+ url +');width:'+size.width +'px;height:'+size.height +'px"/>');
        };
    }
});