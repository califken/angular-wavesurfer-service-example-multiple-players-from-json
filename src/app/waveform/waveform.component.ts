import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { WaveService } from 'angular-wavesurfer-service';

import WaveSurfer = require('wavesurfer.js');
import { AudioFile } from '../audio-file';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css'],
  providers: [WaveService]
})
export class WaveformComponent implements AfterViewInit, OnDestroy {
  @Input() audiofile: AudioFile;
  @Input() layout: string;
  wave: WaveSurfer;
  uuid: string;
  options: {};
  color;
  constructor(public waveService: WaveService, public util: UtilService) {
    this.uuid = this.util.generateUUID();
  }

  ngAfterViewInit() {
    this.color = this.util.colorByNumber(9, this.audiofile.id);
    if (this.layout == 'grid') {
      this.options = {
        waveColor: this.color,
        hideScrollbar: true,
        cursorColor: '#FFF',
        backgroundColor: 'transparent',
        normalize: true,
        removeMediaElementOnDestroy: true,
        backend: 'WebAudio',
        responsive: true
      };
      if (parseInt(this.audiofile.id) % 2 > 0) {
        this.options['barWidth'] = this.util.randomNumber(25);

        this.options['barGap'] = this.util.randomNumber(25);
        this.options['barHeight'] = 0.5;
        this.options['barMinHeight'] = 0.1;
        this.options['barRadius'] = this.util.randomNumber(25);
      }
    } else {
      this.options = {
        waveColor: 'rgba(0,255,255,.9)',
        cursorColor: '#eee',
        hideScrollbar: true,
        backgroundColor: 'transparent'
      };
    }
    this.wave = this.waveService.create({
      container: `#${this.uuid}`,
      ...this.options
    });
    this.wave.load(
      `https://radiant-sands-25270.herokuapp.com/https://www.kennethcaple.com/apps/angular-wavesurfer-downloadable-audio-data-grid/assets/mp3s/${
        this.audiofile.filename
      }`
    );
  }
  ngOnDestroy() {
    this.wave.destroy();
  }
}
