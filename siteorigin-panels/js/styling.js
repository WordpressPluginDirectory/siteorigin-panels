/* global _, jQuery */

jQuery( function ( $ ) {
	// Stretch all the full width rows
	var stretchFullWidthRows = function () {
		if ( ! panelsStyles.stretchRows ) {
			return;
		}
		var fullContainer = $( panelsStyles.fullContainer );
		if ( fullContainer.length === 0 ) {
			fullContainer = $( 'body' );
		}

		var $panelsRow = $( '.siteorigin-panels-stretch.panel-row-style' );
		$panelsRow.each( function () {
			var $$ = $( this );
			var stretchType = $$.data( 'stretch-type' );

			// Reset all the styles associated with row stretching
			$$.css( {
				'margin-left': 0,
				'margin-right': 0,
			} );

			var leftSpace = $$.offset().left - fullContainer.offset().left,
				rightSpace = fullContainer.outerWidth() - leftSpace - $$.parent().outerWidth();

			$$.css( {
				'margin-left': - leftSpace + 'px',
				'margin-right': - rightSpace + 'px',
			} );

			// If Row Layout is Full Width, apply content container.
			if ( stretchType === 'full' ) {
				$$.css( {
					'padding-left': leftSpace + 'px',
					'padding-right': rightSpace + 'px'
				} );
			}
		} );

		if ( $panelsRow.length ) {
			$( window ).trigger( 'panelsStretchRows' );
		}
	}

	if (
		typeof parallaxStyles != 'undefined' &&
		typeof simpleParallax != 'undefined' &&
		(
			! parallaxStyles['disable-parallax-mobile'] ||
			! window.matchMedia( '(max-width: ' + parallaxStyles['mobile-breakpoint'] + ')' ).matches
		)
	) {
		new simpleParallax( document.querySelectorAll( '[data-siteorigin-parallax], .sow-slider-image-parallax .sow-slider-background-image' ), {
			delay: parallaxStyles['delay'],
			scale: parallaxStyles['scale'] < 1.1 ? 1.1 : parallaxStyles['scale'],
		} );
	}

	$( window ).on( 'resize load', function() {
		stretchFullWidthRows();
	} ).trigger( 'resize' );

	// This should have been done in the footer, but run it here just incase.
	$( 'body' ).removeClass( 'siteorigin-panels-before-js' );

} );
