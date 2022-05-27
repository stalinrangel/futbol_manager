import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ClubsComponent } from '../../pages/clubs/clubs.component';
import { UsersComponent } from '../../pages/users/users.component';
import { PlayersComponent } from '../../pages/players/players.component';
import { PaysComponent } from '../../pages/pays/pays.component';
import { InboxComponent } from '../../pages/inbox/inbox.component';
import { ScootingComponent } from '../../pages/scooting/scooting.component';
import { PromoComponent } from '../../pages/promo/promo.component';
import { UserPlayerComponent } from '../../pages/user-player/user-player.component';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'clubs',          component: ClubsComponent },
    { path: 'players',        component: PlayersComponent },
    { path: 'users',          component: UsersComponent },
    { path: 'pays',           component: PaysComponent },
    { path: 'inbox',          component: InboxComponent },
    { path: 'scooting',       component: ScootingComponent },
    { path: 'promo',          component: PromoComponent },
    { path: 'user-player',    component: UserPlayerComponent },
    { path: 'subscription',   component: SubscriptionComponent },
];
