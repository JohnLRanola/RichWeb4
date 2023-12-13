# Generated by Django 4.2.7 on 2023-11-27 22:22

from django.db import migrations, models
import pharmacy.models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0003_alter_prescription_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prescription',
            name='id',
            field=models.CharField(default=pharmacy.models.generate_id, editable=False, max_length=8, primary_key=True, serialize=False),
        ),
    ]