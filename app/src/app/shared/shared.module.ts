import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import {MatSidenavModule} from '@angular/material/sidenav'; 

import { AutocompleteModule } from "./components/autocomplete/autocomplete.module";
import { PipeModule } from "app/shared/pipes/pipe.module";

//COMPONENTS
import { NavbarComponent } from "./navbar/navbar.component";
import { HorizontalMenuComponent } from "./horizontal-menu/horizontal-menu.component";
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu'; 

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from "./directives/sidebar-link.directive";
import { SidebarDropdownDirective } from "./directives/sidebar-dropdown.directive";
import { SidebarAnchorToggleDirective } from "./directives/sidebar-anchor-toggle.directive";
import { SidebarDirective } from "./directives/sidebar.directive";
import { TopMenuDirective } from "./directives/topmenu.directive";
import { TopMenuLinkDirective } from "./directives/topmenu-link.directive";
import { TopMenuDropdownDirective } from "./directives/topmenu-dropdown.directive";
import { TopMenuAnchorToggleDirective } from "./directives/topmenu-anchor-toggle.directive";
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  exports: [
    CommonModule,
    NavbarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    ToggleFullscreenDirective,
    SidebarDirective,
    TopMenuDirective,
    NgbModule,
    TranslateModule,
    PipeModule,
    SideNavComponent    
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    AutocompleteModule,
    PipeModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule
  ],
  declarations: [
    NavbarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    ToggleFullscreenDirective,
    SidebarLinkDirective,
    SidebarDropdownDirective,
    SidebarAnchorToggleDirective,
    SidebarDirective,
    TopMenuLinkDirective,
    TopMenuDropdownDirective,
    TopMenuAnchorToggleDirective,
    TopMenuDirective,
    SideNavComponent,
  ],
})
export class SharedModule {}
