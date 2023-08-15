import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RepuestosComponent } from './components/repuestos/repuestos.component';
import { ParatiComponent } from './components/parati/parati.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccesoriosComponent,
    ServiciosComponent,
    RepuestosComponent,
    ParatiComponent,
    SobreNosotrosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
