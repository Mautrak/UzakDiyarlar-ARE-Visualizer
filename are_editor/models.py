from django.db import models

# Create your models here.
class Area(models.Model):
        app_label = 'are_editor'
        name = models.CharField(max_length=255)
        level_range_low = models.IntegerField()
        level_range_high = models.IntegerField()
        author = models.CharField(max_length=255)

class Help(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    level = models.IntegerField()
    keywords = models.CharField(max_length=255)
    text = models.TextField()

class Mobile(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    vnum = models.IntegerField()
    keywords = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255)
    long_description = models.TextField()
    description = models.TextField()
    act_flags = models.IntegerField()
    affected_flags = models.IntegerField()
    alignment = models.IntegerField()
    level = models.IntegerField()
    sex = models.IntegerField()

class Object(models.Model):
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, blank=True)
    vnum = models.IntegerField()
    keywords = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255)
    long_description = models.TextField()
    action_description = models.TextField(blank=True)
    item_type = models.IntegerField()
    extra_flags = models.IntegerField()
    wear_flags = models.IntegerField()
    value_0 = models.IntegerField()
    value_1 = models.IntegerField()
    value_2 = models.IntegerField()
    value_3 = models.IntegerField()
    weight = models.IntegerField()

class Room(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    vnum = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField()
    room_flags = models.IntegerField()
    sector_type = models.IntegerField()

class Reset(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    command = models.CharField(max_length=1)
    COMMAND_CHOICES = (
        ('M', 'Mobile'),
        ('O', 'Object'),
        ('P', 'Put Object in Object'),
        ('G', 'Give Object to Mobile'),
        ('E', 'Equip Object to Mobile'),
        ('D', 'Set State of Door'),
        ('R', 'Randomize Room Exits'),
    )
    command_type = models.CharField(max_length=1, choices=COMMAND_CHOICES)
    mob_vnum = models.IntegerField(null=True, blank=True)  # For 'M' command
    obj_vnum = models.IntegerField(null=True, blank=True)  # For 'O', 'P', 'G', 'E' commands
    limit = models.IntegerField(null=True, blank=True)  # For 'M' command
    room_vnum = models.IntegerField(null=True, blank=True)  # For 'M', 'O', 'D', 'R' commands
    door_number = models.IntegerField(null=True, blank=True)  # For 'D', 'R' commands
    state = models.IntegerField(null=True, blank=True)  # For 'D' command
    comment = models.CharField(max_length=255, blank=True)

class Shop(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    keeper = models.IntegerField()
    trade_0 = models.IntegerField()
    trade_1 = models.IntegerField()
    trade_2 = models.IntegerField()
    trade_3 = models.IntegerField()
    trade_4 = models.IntegerField()
    profit_buy = models.IntegerField()
    profit_sell = models.IntegerField()
    open_hour = models.IntegerField()
    close_hour = models.IntegerField()
    comment = models.CharField(max_length=255, blank=True)

class ShopInventory(models.Model):
    shopkeeper = models.ForeignKey(Mobile, on_delete=models.CASCADE)
    object = models.ForeignKey(Object, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)  # Optional field for quantity

class Special(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    mob_vnum = models.IntegerField()
    spec_fun = models.CharField(max_length=255)
    comment = models.CharField(max_length=255, blank=True)

    # Self-referential foreign key for container relationship
    container = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)