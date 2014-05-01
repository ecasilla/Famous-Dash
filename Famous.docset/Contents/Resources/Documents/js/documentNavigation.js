$(function () {

    function NavigationSync () {

        this.options = {
            scrollable: 'doc-nav-scroll',
            docPrefix: 'nav-',
            methodPrefix: 'method-',
            padding: 40,
            scrollHeightLimit: 1000
        }

        this.$scrollable = document.getElementById(this.options.scrollable);
        this.$scroller = document.getElementById('docs-container');

        window.addEventListener('resize', this.updateDocNavigationHeights.bind(this));

        this.$classname;
        this.$method;
        this.classname;
        this.bottomOfMethodNavigation;

        this.$navItems = {

        }

        this.docNavigationHeights = {
            // id : navHeight
        }

        this.methodHeights = {
            // id : methodheight
        }

        this.navToMethod = {
            // navId: 'methodId'
        }

        this.methodToNav = {
            // methodId: navId
        }

        this.increment = 0;

        if ( window.location ) {
            this.init()
                .updateDocNavigationHeights()
                .updateNavigationHeights()
                .events()
                .updateMethodHighlights(true)
                .updateDocNavigationHeight()
        }
    }

    NavigationSync.prototype = {

        init: function () {

            var hash = window.location.hash;
            hash = hash.replace( '#', '');
            this.setCurrentMethod( hash );

            var classname = getClassFromPath();

            this.docClass = this.options.docPrefix + classname;
            this.$navClass = document.getElementById( this.docClass );

            var height = getHeight( this.$navClass);
            this.$scrollable.scrollTop = height - this.options.padding;

            this.bottomOfMethodNavigation = this.$scrollable.scrollHeight;

            return this;
        },

        updateDocNavigationHeight: function () {
            this.$scrollable.style.height = (window.innerHeight - 112) + 'px';
        },

        setCurrentMethod: function ( name ) {
            this.currentMethod = name;
        },

        _checkLimitedScrolling: function () {
            var firstHeight = this.getFirstMethodHeight();
            return firstHeight > (this.bottomOfMethodNavigation - this.options.scrollHeightLimit);
        },


        getCurrentMethodName: function () {
            return this.options.docPrefix + this.docClass + '-' + this.currentMethod;
        },

        getFirstMethodHeight: function () {
            return this.docNavigationHeights[Object.keys(this.docNavigationHeights)[0]]
        },

        getNavScrollPosition: function () {
            return this.$scrollable.scrollTop;
        },

        updateDocNavigationHeights: function () {
            var children = this.$navClass.parentNode.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                this.docNavigationHeights[child.id] = getHeight( children[i] );
            };
            return this;
        },

        updateNavigationHeights: function () {
            var keys = this.getMethodKeys();

            for (var i = 0; i < keys.length; i++) {
                var methodId = keys[i];
                var $method = document.getElementById( methodId );

                if( $method ) this.methodHeights[methodId] = getHeight( $method );
            };

            return this;
        },

        getMethodKeys : function() {
            var keys = Object.keys( this.docNavigationHeights );
            var methodKeys = [];
            for (var i = 0; i < keys.length; i++) {

                var split = keys[i].split('-'),
                    method =  this.options.methodPrefix + split[split.length - 1];

                this.navToMethod[keys[i]] = method;
                this.methodToNav[method] = keys[i];

                methodKeys.push( method);

            };
            return methodKeys;
        },

        // EVENTS
        events: function () {
            this.listenToScroll()
                .hashListener();

            return this;
        },
        listenToScroll: function () {
            this.$scroller.addEventListener('scroll', this.scrollListener.bind(this));
            this.shouldLimitScrolling = this._checkLimitedScrolling();
            return this;
        },

        scrollListener: function ( e ) {
            this.increment++;
            if( this.increment % 5 === 0 ) {

                var height = this.getNavScrollPosition();
                var v = this._getDelta( height );

                if( Math.abs(v) < 1 && height < (this.bottomOfMethodNavigation - this.options.scrollHeightLimit) || this.shouldLimitScrolling ) {
                    this.updateMethodHighlights();
                }
            }
        },

        _getDelta: function ( height ) {
            var currTime = Date.now(),
                velocity;

            if( this._lastScrollTime ) {

                var timeDelta = currTime - this._lastScrollTime,
                    heightDelta = height - this._lastScrollHeight;

                velocity = heightDelta / timeDelta;
            }

            this._lastScrollTime = currTime;
            this._lastScrollHeight = height;
            return velocity;
        },

        hashListener: function () {
            window.addEventListener('hashchange', this.updateMethodHighlights.bind(this));
            return this;
        },

        updateMethodHighlights: function (isFirst) {

            var methodKey = this.getClosestMethodToWindow();
            var navId = this.methodToNav[methodKey];
            var $navElem = this.$navItems[navId];

            if(! $navElem ) $navElem = this.$navItems[navId] = document.getElementById(navId);

            if(isFirst) navId = undefined;
            this.highlight( $navElem, navId );

            return this;

        },


        getClosestMethodToWindow: function () {

            var windowPos = this.$scroller.scrollTop + 212;

            var closestDist = 9999,
                closestKey;

            for ( var key in this.methodHeights ) {
                var distance = getDistance(this.methodHeights[key], windowPos );

                if( distance < closestDist ) {
                    closestDist = distance;
                    closestKey = key;
                }
            };

            return closestKey;
        },

        highlight: function ( elem, key ) {
            if( elem == this._lastHighlight ) return;

            elem.classList.add('doc-highlight');
            //elem.style.color = "#404040"
            if( key ) this.$scrollable.scrollTop  = this.docNavigationHeights[key] - this.options.padding;

            if( this._lastHighlight) {
                //this._lastHighlight.style.color = '#fa5c4f';
                this._lastHighlight.classList.remove('doc-highlight');
            }

            this._lastHighlight = elem;

        }
    }


    function getHeight ( elem ) {
        var parentElem = elem;

        var distance = 0;

        while ( elem.offsetParent ) {

            distance += elem.offsetTop;
            elem = elem.offsetParent;

        }
        return distance;
    }


    function getClassFromPath() {
        var path = window.location.pathname;

        if(path[path.length-1] === "/") {
            path = path.substring(0, path.length-1);
        }

        path = path.split('/');
        return path[path.length - 1]
    }

    function getDistance (x1, x2) {
        return Math.abs( x1 - x2 );
    }

    setTimeout(function () {
        var nav = new NavigationSync();
    }, 20);

});
