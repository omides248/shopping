import datetime
import pytz

from django.db import models


class LimitIPSms(models.Model):
    ip = models.GenericIPAddressField(verbose_name="IP", unique=True)
    limit_count = models.PositiveIntegerField(verbose_name="Limit count", default=0)
    limit_datetime = models.DateTimeField(verbose_name="Limit time", default=None, null=True, blank=True)
    updated_at = models.DateTimeField(verbose_name="Created at", auto_now=True)

    @classmethod
    def access_send_sms(cls, ip=None):
        try:
            limit_sms_obj = LimitIPSms.objects.get(ip=ip)
        except LimitIPSms.DoesNotExist:
            limit_sms_obj = LimitIPSms.objects.create(ip=ip)

        if (limit_sms_obj.limit_datetime is None and limit_sms_obj.limit_count < 4) or (
                limit_sms_obj.limit_datetime and limit_sms_obj.limit_datetime < datetime.datetime.utcnow().replace(
            tzinfo=pytz.utc)):
            print(111111111111111111111)
            if limit_sms_obj.limit_count > 2:
                print(2222222222222222222222222222222222222)
                if (datetime.datetime.utcnow().replace(tzinfo=pytz.utc) - limit_sms_obj.updated_at.replace(
                        tzinfo=pytz.utc)).total_seconds() > 10:
                    print(3333333333333333333333333333333333333333333333)
                    """ If limit_count current is greater than limit but request sent after 10 seconds then use access send sms """
                    limit_sms_obj.limit_count = 1
                    limit_sms_obj.save()
                    return True
                else:
                    print(44444444444444444444444444444444444444444444)
                    limit_sms_obj.limit_count = 0
                    limit_sms_obj.limit_datetime = datetime.datetime.utcnow().replace(
                        tzinfo=pytz.utc) + datetime.timedelta(seconds=10)
                    limit_sms_obj.save()
                    return False
            else:
                print(55555555555555555555555555555555555555)
                limit_sms_obj.limit_count += 1
                limit_sms_obj.save()
                return True
        print(66666666666666666666666666666666666666)
        return False

    def __str__(self):
        return self.ip
