import { Component, Input } from '@angular/core';
import { FileItem } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-files-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss'
})
export class FilesTableComponent {
    @Input() files: FileItem[] = [];

    get selectedCount(): number {
        return this.files.filter(file => file.selected).length;
    }

    get selectionText(): string {
        const count = this.selectedCount;
        return count === 0 ? 'None Selected' : `Selected ${count}`;
    }

    get allSelected(): boolean {
        return this.files.length > 0 && this.files.every(file => file.selected);
    }

    get someSelected(): boolean {
        return this.files.some(file => file.selected) && !this.allSelected;
    }

    toggleSelectAll(): void {
        const shouldSelect = !this.allSelected;
        this.files.forEach(file => {
            file.selected = shouldSelect;
        });
    }

    toggleFileSelection(file: FileItem): void {
        file.selected = !file.selected;
    }

    downloadSelected(): void {
        const selectedFiles = this.files.filter(file => file.selected && file.status === 'available');
        const scheduledFiles = this.files.filter(file => file.selected && file.status === 'scheduled');

        if (selectedFiles.length === 0) {
            alert("The selected files are not available for download.");
            return;
        }

        const dInfo = selectedFiles.map(file => `Path: ${file.path}\n Device: ${file.device}`).join("\n\n");

        if (scheduledFiles.length === 0) {
            alert(`Downloading selected files:\n\n${dInfo}`);
        } else {
            alert(`Downloading selected files:\n\n${dInfo}\n\nSome selected files are not available for download.`)
        }
    }

    isDownloadDisabled(file: FileItem): boolean {
        return file.status !== "available";
    }

    isAvailable(file: FileItem): boolean {
        return file.status === "available";
    }

}
