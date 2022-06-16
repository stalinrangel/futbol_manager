import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClubsComponent } from '../../pages/clubs/clubs.component';
import { UsersComponent } from '../../pages/users/users.component';
import { PlayersComponent } from '../../pages/players/players.component';
import { PaysComponent } from '../../pages/pays/pays.component';
import { InboxComponent } from '../../pages/inbox/inbox.component';
import { PromoComponent } from '../../pages/promo/promo.component';
import { UserPlayerComponent } from '../../pages/user-player/user-player.component';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';

import { ScootingComponent } from '../../pages/scooting/scooting.component';
import { TeamComponent } from 'src/app/pages/team/team.component';
import { CoachComponent } from 'src/app/pages/coach/coach.component';
import { VideoComponent } from 'src/app/pages/video/video.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ClubsComponent,
    UsersComponent,
    PlayersComponent,
    PaysComponent,
    InboxComponent,
    ScootingComponent,
    PromoComponent,
    UserPlayerComponent,
    SubscriptionComponent,
    TeamComponent,
    CoachComponent,
    VideoComponent
  ]
})

export class AdminLayoutModule {}
