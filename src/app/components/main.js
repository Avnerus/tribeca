import riot from 'riot';
import componentFactory from '../component-factory';
import face from './face';

componentFactory.createComponent('main', `

<face></face>

<style>
    main {
        display: block;
    }
    body {
        margin: 0;
    }
</style>
 
 `,
 function(opts) {
    this.on('mount', () => {
        console.log("Main mounted");
    });

    this.dispatcher.on('main_state_updated', () => {
        this.update();
    });
});
