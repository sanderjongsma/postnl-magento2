/**
 *                  ___________       __            __
 *                  \__    ___/____ _/  |_ _____   |  |
 *                    |    |  /  _ \\   __\\__  \  |  |
 *                    |    | |  |_| ||  |   / __ \_|  |__
 *                    |____|  \____/ |__|  (____  /|____/
 *                                              \/
 *          ___          __                                   __
 *         |   |  ____ _/  |_   ____ _______   ____    ____ _/  |_
 *         |   | /    \\   __\_/ __ \\_  __ \ /    \ _/ __ \\   __\
 *         |   ||   |  \|  |  \  ___/ |  | \/|   |  \\  ___/ |  |
 *         |___||___|  /|__|   \_____>|__|   |___|  / \_____>|__|
 *                  \/                           \/
 *                  ________
 *                 /  _____/_______   ____   __ __ ______
 *                /   \  ___\_  __ \ /  _ \ |  |  \\____ \
 *                \    \_\  \|  | \/|  |_| ||  |  /|  |_| |
 *                 \______  /|__|    \____/ |____/ |   __/
 *                        \/                       |__|
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Creative Commons License.
 * It is available through the world-wide-web at this URL:
 * http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US
 * If you are unable to obtain it through the world-wide-web, please send an email
 * to servicedesk@totalinternetgroup.nl so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize this module for your
 * needs please contact servicedesk@totalinternetgroup.nl for more information.
 *
 * @copyright   Copyright (c) 2017 Total Internet Group B.V. (http://www.totalinternetgroup.nl)
 * @license     http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US
 */
define(['ko', 'Magento_Checkout/js/model/quote', 'jquery'], function (ko, quote, $) {
    'use strict';

    var address, shippingAddress, oldAddress = false;

    /**
     * Collect the needed information from the quote
     */
    return ko.computed(function () {
        shippingAddress = quote.shippingAddress();
        if (!shippingAddress) {
            return oldAddress;
        }

        address = {
            postalCode  : shippingAddress.postcode,
            countryCode : shippingAddress.countryId,
            street      : shippingAddress.street,
            firstname   : shippingAddress.firstname,
            lastname    : shippingAddress.lastname,
            telephone   : shippingAddress.telephone
        };

        /**
         * Unfortunately Magento does not always fill all fields, so get them ourselves.
         */
        if (!address.street) {
            address.street = {
                0 : $("input[name*='street[0]']").val(),
                1 : $("input[name*='street[1]']").val()
            };
        }

        if (!address.postalCode) {
            address.postalCode = $("input[name*='postcode']").val();
        }

        if (!address.firstname) {
            address.firstname = $("input[name*='firstname']").val();
        }

        if (!address.lastname) {
            address.lastname = $("input[name*='lastname']").val();
        }

        if (!address.telephone) {
            address.telephone = $("input[name*='telephone']").val();
        }

        if (!address.postalCode || !address.countryCode || !address.street) {
            return oldAddress;
        }

        if (!address.postalCode.length || !address.countryCode.length || address.street[0] === ''
        ) {
            return oldAddress;
        }

        oldAddress = address;

        return address;
    }.bind(this));
});