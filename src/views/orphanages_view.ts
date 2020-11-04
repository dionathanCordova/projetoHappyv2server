import Orphanages from '../models/Orphanages';
import ImagesView from './images_view';

export default {
    render(orphanage: Orphanages) {
        return{
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instruction: orphanage.instruction,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: ImagesView.renderMany(orphanage.images),
            user_id: orphanage.user_id
        }
    },

    renderMany(orphanages: Orphanages[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}