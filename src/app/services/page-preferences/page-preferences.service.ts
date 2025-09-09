import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagePreferencesService {
    private renderer: Renderer2;
    
    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    toggleDarkMode() {
        this.renderer.addClass(this.document.body, 'dark');
        this.renderer.removeClass(this.document.body, 'light');
    }

    toggleLightMode() {
        this.renderer.addClass(this.document.body, 'light');
        this.renderer.removeClass(this.document.body, 'dark');
    }
}
