import { UserCardNumber } from "../../../components/Badges"

const UserBtnList = () => {
    return (
        <section className="section2 flexWrapBetween sectionWrapper" style={{ marginTop: 'clamp(10px, 5vw, 20px)' }}>
            <div className="Vgap20px">
                <UserCardNumber value="120" text="Основная вместимость" />
                <UserCardNumber value="300" text="Фуршет" />
            </div>
            <div className="Vgap20px">
                <UserCardNumber value="250" text="Концертный зал" />
                <UserCardNumber value="300" text="Клуб" />
            </div>
            <div className="Vgap20px">
                <UserCardNumber value="250" text="Конференция" />
                <UserCardNumber value="300" text="Банкетный зал" />
            </div>
        </section>
    )
}

export default UserBtnList