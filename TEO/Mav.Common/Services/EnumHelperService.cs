using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

namespace Mav.Common.Services
{
    public static class EnumHelperService
    {
        public class EnumMemberInfo : IEquatable<EnumMemberInfo>
        {
            public EnumMemberInfo(List<object> attributes)
            {
                Attributes = attributes;
            }

            private List<object> Attributes { get; }

            public string Label { get; set; }

            public string Description => GetAttribute<DescriptionAttribute>()?.Description ?? string.Empty;

            public int IntValue { get; set; }

            public string StringValue { get; set; }

            public bool HasAttribute<T>() where T : Attribute
            {
                return Attributes.OfType<T>().Any();
            }

            public T GetAttribute<T>() where T : Attribute
            {
                return Attributes.OfType<T>().FirstOrDefault();
            }

            public override string ToString()
            {
                return
                    !string.IsNullOrEmpty(StringValue)
                        ? StringValue
                        : !string.IsNullOrEmpty(Description)
                            ? Description
                            : string.IsNullOrEmpty(Label)
                                ? Label
                                : IntValue.ToString(CultureInfo.InvariantCulture);
            }

            public override bool Equals(object obj)
            {
                var enumMemberInfo = obj as EnumMemberInfo;
                return enumMemberInfo != null && Equals(enumMemberInfo);
            }

            public bool Equals(EnumMemberInfo obj)
            {
                return IntValue == obj?.IntValue;
            }

            public override int GetHashCode()
            {
                return IntValue.GetHashCode();
            }

            public static bool operator ==(EnumMemberInfo obj1, EnumMemberInfo obj2)
            {
                return obj1 != null && obj1.Equals(obj2);
            }

            public static bool operator !=(EnumMemberInfo obj1, EnumMemberInfo obj2)
            {
                return obj1 != null && !obj1.Equals(obj2);
            }

        }

        public static string GetDescription(Enum value)
        {
            var fi = value.GetType().GetField(value.ToString());

            if (fi == null) { return string.Empty; }

            var attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length == 0 ? value.ToString() : ((DescriptionAttribute)attributes[0]).Description;
        }

        public static bool HasAttribute<T>(Enum value)
        {
            return value.GetType().GetField(value.ToString())?.GetCustomAttributes(typeof(T), false).Any() ?? false;
        }

        public static T GetAttribute<T>(Enum value) where T : Attribute
        {
            return value.GetType().GetField(value.ToString())?.GetCustomAttributes(typeof(T), false).FirstOrDefault() as T;
        }

        public static string GetLabel(Enum value)
        {
            return value.ToString();
        }

        public static int GetIntValue(Enum value)
        {
            try
            {
                return Convert.ToInt32(value);
            }
            catch
            {
                return 0;
            }
        }

        public static string GetLabelOrNullIfZero(Enum value)
        {
            return GetIntValue(value) == 0 ? null : value.ToString();
        }

        public static Dictionary<string, EnumMemberInfo> GetEnumMembers(Type type)
        {
            return type.GetFields()
                .Where(x => x.FieldType == type)
                .Select(x => new EnumMemberInfo(x.GetCustomAttributes(false).ToList())
                {
                    Label = x.Name,
                    IntValue = (int)x.GetRawConstantValue()
                }).ToDictionary(x => x.Label);
        }

        public static Dictionary<string, EnumMemberInfo> GetEnumMembers<T>()
        {
            return GetEnumMembers(typeof(T));
        }

        public static IEnumerable<T> EnumerateMembers<T>()
        {
            var type = typeof(T);
            return type.GetFields()
                .Where(x => x.FieldType == type)
                .Select(x => (T)x.GetRawConstantValue());
        }

        public static Dictionary<T, string> GetDescriptions<T>()
        {
            return GetEnumMembers<T>()
                .ToDictionary(x => (T)(object)x.Value.IntValue, x => x.Value.Description);
        }

        public static T FromInt<T>(int value)
        {
            return (T)Enum.Parse(typeof(T), value.ToString(CultureInfo.InvariantCulture));
        }

        public static T FromInt<T>(int value, T defaultValue)
        {
            try { return FromInt<T>(value); }
            catch
            {
                return defaultValue;
            }
        }

        public static T FromLabel<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static T FromLabel<T>(string value, T defaultValue)
        {
            try { return FromLabel<T>(value); }
            catch
            {
                return defaultValue;
            }
        }

        public static T? FromGuidId<T>(Guid? id) where T : struct, IConvertible
        {
            if (id.HasValue)
            {
                return FromGuidId<T>((Guid)id);
            }
            return null;
        }

        public static T FromStringValue<T>(string value)
        {
            return (T)(object)GetEnumMembers<T>().Values
                .First(e => value.Equals(e.StringValue, StringComparison.InvariantCultureIgnoreCase)).IntValue;
        }

        public static T FromStringValue<T>(string value, T defaultValue)
        {
            try { return FromStringValue<T>(value); }
            catch
            {
                return defaultValue;
            }
        }

        public static T FromStringValue<T>(char value)
        {
            return FromStringValue<T>(value.ToString());
        }

        public static T FromStringValue<T>(char value, T defaultValue)
        {
            return FromStringValue(value.ToString(), defaultValue);
        }

        public static TEnum FromDescription<TEnum>(string value)
        {
            return (TEnum)(object)GetEnumMembers<TEnum>().Values
                .First(e => value.Equals(e.Description, StringComparison.InvariantCultureIgnoreCase)).IntValue;
        }

        public static TEnum FromDescription<TEnum>(string value, TEnum defaultValue)
        {
            try
            {
                return FromDescription<TEnum>(value);
            }
            catch
            {
                return defaultValue;
            }
        }

        public static bool HasLabel<T>(string value) where T : struct
        {
            T result;
            return Enum.TryParse(value, out result);
        }
    }
}
