/*jshint esversion: 6 */
(function() {
    'use strict';
    let Readable = require(`stream`).Readable;
    class S3RS extends Readable {

        /**
         * @param {Object} options Stream.readable options
         * @param {Object} data read Data
         * @param {Number} speed read Speed( = speed * MB) . default and min : 5 MB.  if speed = 5. The read speed = 5KB
         */
        constructor(options, data, speed){
            super(options);
            this._data = Buffer.from(data); //target
            this._dataLength = this._data.length; //Buffer size
            this._speed = ((speed < 5 || typeof speed !== `number`)? 5: speed) * 1024 * 1024 *1000; //every read up to 5 MB
            this._schedule = 0; //read schedule
        }
        _read(size){
            if(this._schedule >= this._dataLength){
                this.push(null); //read over
            } else {
                let iEndLength = ( (this._dataLength - this._schedule) < this._speed)? this._dataLength - this._schedule : this._schedule + this._speed;    //
                this.push(this._data.slice(this._schedule, iEndLength));
                this._schedule += iEndLength;
            }
            return;
        }
        /** destroy this readstream*/
        useover(){
            this._data = null;
            this.destroy();
        }
    }
    module.exports = S3RS;



}());