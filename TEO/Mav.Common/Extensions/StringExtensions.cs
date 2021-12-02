using System;
using System.ComponentModel;

namespace Mav.Common.Extensions
{
    public static class StringExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T ConvertStringToTypeValue<T>(this string value)
        {
            return (T)Convert.ChangeType(value, typeof(T));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="setting"></param>
        /// <returns></returns>
        public static T GetSettingToTypeValue<T>(this string setting)
        {
            var converter = TypeDescriptor.GetConverter(typeof(T));
            var result = converter.ConvertFrom(setting);
            return (T)result;
        }
    }
}
