(function () {

    var isMobile = (function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            return true;
        }
        return false;
    })();


    document.addEventListener('DOMContentLoaded', function () {

        animate();
        var mobileNav = new MobileNavigation();

    });

    function animate() {

        requestAnimationFrame( animate );
        TWEEN.update();

    }


    function MobileNavigation () {

        // state
        this.navVisible = false;
        this.isAnimating = false;

        this.toggle = this._toggle.bind(this);

        // dom elems
        this.$navButton;
        this.$navContainer;
        this.$mainContent;

        this.initNav();

    }

    MobileNavigation.prototype.initNav = function () {

        this.$navButton = document.getElementById('nav-menu-button');
        this.$navContainer = document.getElementById('mobileNav');
        this.$mainContent = document.getElementsByClassName('main-content');

        if( !this.$navButton ) return;

        if( isMobile ) this.$navButton.addEventListener('touchend', this.toggle);
        else this.$navButton.addEventListener('mousedown', this.toggle);


        return this;

    }

    MobileNavigation.prototype.bindCloseListener = function () {

        if( isMobile ) this.$navContainer.addEventListener('touchend', this.toggle);
        else this.$navContainer.addEventListener('mousedown', this.toggle);

    }

    MobileNavigation.prototype.unbindCloseListener = function () {

        if( isMobile ) this.$navContainer.removeEventListener('touchend', this.toggle);
        else this.$navContainer.removeEventListener('mousedown', this.toggle);

    }



    MobileNavigation.prototype.preventMainScrolling = function () {
        for (var i = 0; i < this.$mainContent.length; i++) {
            this.$mainContent[i].style.display = 'none';
        };
    }

    MobileNavigation.prototype.allowMainScrolling = function () {
        for (var i = 0; i < this.$mainContent.length; i++) {
            this.$mainContent[i].style.display = 'block';
        };
    }


    MobileNavigation.prototype._toggle = function (e) {
        e.stopPropagation();

        if(this.isAnimating == true) return; // dont do anything during an animation.

        if( !this.navVisible ) this.showNav();
        else this.hideNav();

    }

    MobileNavigation.prototype.showNav = function () {
        this.navVisible = true;

        this.$navContainer.style.top = 0;
        this.preventMainScrolling();

        var start = {
            opacity: 0,
            $navContainer: this.$navContainer
        }

        var end = {
            opacity: 0.999
        }

        var tween = new TWEEN.Tween(start)
            .to(end, 350)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate( this.showingUpdate)
            .onComplete((function () {

                this.bindCloseListener();
                this.isAnimating = false;

            }).bind(this));

        tween.start();

    }

    MobileNavigation.prototype.showingUpdate = function ( evt ) {

        this.$navContainer.style.opacity = this.opacity;

    }

    MobileNavigation.prototype.hideNav = function () {

        this.navVisible = false;

        this.allowMainScrolling();
        this.unbindCloseListener();

        var start = {
            opacity: 0.999,
            $navContainer: this.$navContainer
        }

        var end = {
            opacity: 0
        }

        var tween = new TWEEN.Tween(start)
            .to(end, 350)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate( this.showingUpdate)
            .onComplete((function () {

                this.$navContainer.style.top = '-100%';
                this.isAnimating = false;

            }).bind(this));

        tween.start();


    }


})();
