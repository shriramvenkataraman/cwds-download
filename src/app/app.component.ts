import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilesTableComponent } from "./files-table/files-table.component";
import { FileItem } from './models';
import { FILES } from './constants/files';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'download';
    files: FileItem[] = FILES;
}
