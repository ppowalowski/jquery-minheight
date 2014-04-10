!function(window){
    var MinHeight = function(element,index,options){
        var self = this;
        this.fireEvent = function(eventHandler,event){
            if(this.options['on'+eventHandler]!= false){
                if(!event)
                    event = [];
                else if(!jQuery.isArray(event))
                    event = [event];
                this.options['on'+eventHandler].apply(this,event);
            }
        };
        this.options = {
            'substractTopHeight':true,
            'minHeight':400,
            'relativeHeight':80
        };
        this.initialize = function(options){
            if (options){
                if(options["ppMinheightOptions"])
                    jQuery.extend(true, this.options, options["ppMinheightOptions"]);
                else
                    jQuery.extend(true, this.options, options);
            }
            this.$element = jQuery(element);
            this.attachEvents();
            this.setHeight();
            return this;
        };
        this.setHeight = function(){
            topHeight = 0;
            console.log(this.options.substractTopHeight);
            if(this.options.substractTopHeight){
                topHeight = this.$element.offset().top;
            };
            var height = parseInt(jQuery(window).height())-parseInt(topHeight);
            if (height < this.options.minHeight)
                height = this.options.minHeight;
            height = height*(this.options.relativeHeight/100);
            this.$element.css({
                'min-height':height+'px'
            });
        };
        this.attachEvents = function(){
            var self = this;
            jQuery(window).on('resize.pp.minHeight',function(e){
                self.setHeight();
            });
        };
        this.initialize(options);
    };
    jQuery.fn.minHeight = function(options){
        this.each(function(index,element){
            var $this = jQuery(this);
            var data = $this.data('pp.minHeight');
            if(!data)
                jQuery(this).data('pp.minHeight',new MinHeight(this,index,options));
        });
        return this;
    };
    jQuery(function() {
        jQuery('[data-minheight="true"]').each(function() {
            var $element = $(this);
            $element.minHeight($element.data());
        });
    });
}(window);
