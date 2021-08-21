import { Component, ViewChild } from '@angular/core';
import { ProductService } from './productservice';
import { Product } from './product';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AudioFile } from './audio-file';
import { AudioLibraryService } from './audiolibrary.service';
import { WaveService } from 'angular-wavesurfer-service';
import { WaveSurfer } from 'wavesurfer.js';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dv') dv: DataView;

  audioFiles: AudioFile[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  wave: WaveSurfer;

  constructor(
    public waveService: WaveService,
    public util: UtilService,
    private audioLibraryService: AudioLibraryService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.audioLibraryService
      .getAudioLibrary()
      .then(data => (this.audioFiles = data));

    this.sortOptions = [
      { label: 'Title', value: 'name' },
      { label: 'Title Desc', value: '!name' },
      { label: 'Downloads', value: 'downloads' },
      { label: 'Downloads Desc', value: '!downloads' }
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
