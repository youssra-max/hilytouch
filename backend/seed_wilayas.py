WILAYAS = [
    ("01", "Adrar"), ("02", "Chlef"), ("03", "Laghouat"), ("04", "Oum El Bouaghi"),
    ("05", "Batna"), ("06", "Béjaïa"), ("07", "Biskra"), ("08", "Béchar"),
    ("09", "Blida"), ("10", "Bouira"), ("11", "Tamanrasset"), ("12", "Tébessa"),
    ("13", "Tlemcen"), ("14", "Tiaret"), ("15", "Tizi Ouzou"), ("16", "Alger"),
    ("17", "Djelfa"), ("18", "Jijel"), ("19", "Sétif"), ("20", "Saïda"),
    ("21", "Skikda"), ("22", "Sidi Bel Abbès"), ("23", "Annaba"), ("24", "Guelma"),
    ("25", "Constantine"), ("26", "Médéa"), ("27", "Mostaganem"), ("28", "M'Sila"),
    ("29", "Mascara"), ("30", "Ouargla"), ("31", "Oran"), ("32", "El Bayadh"),
    ("33", "Illizi"), ("34", "Bordj Bou Arreridj"), ("35", "Boumerdès"), ("36", "El Tarf"),
    ("37", "Tindouf"), ("38", "Tissemsilt"), ("39", "El Oued"), ("40", "Khenchela"),
    ("41", "Souk Ahras"), ("42", "Tipaza"), ("43", "Mila"), ("44", "Aïn Defla"),
    ("45", "Naâma"), ("46", "Aïn Témouchent"), ("47", "Ghardaïa"), ("48", "Relizane"),
    ("49", "Timimoun"), ("50", "Bordj Badji Mokhtar"), ("51", "Ouled Djellal"),
    ("52", "Béni Abbès"), ("53", "In Salah"), ("54", "In Guezzam"),
    ("55", "Touggourt"), ("56", "Djanet"), ("57", "El M'Ghair"), ("58", "El Meniaa")
]

from orders.models import ShippingRate

def seed_wilayas():
    count = 0
    for code, name in WILAYAS:
        rate, created = ShippingRate.objects.get_or_create(
            wilaya_code=code,
            defaults={
                'wilaya_name': name,
                'standard_price': 500 if code == "16" else 800,
                'express_price': 800 if code == "16" else 1200,
                'standard_days': '24-48h' if code == "16" else '3-5 jours',
                'express_days': '24h' if code == "16" else '48-72h',
            }
        )
        if created:
            count += 1
    print(f"successfully seeded {count} wilayas!")

if __name__ == '__main__':
    seed_wilayas()
